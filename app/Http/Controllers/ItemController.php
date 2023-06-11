<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = Item::paginate(5);
        return response([
            'data' => $items
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemRequest $request)
    {
        $itemData = $request->validated();

        // Check if image file is present in the request
        if ($request->hasFile('image')) {
            $image = $request->file('image');

            // Generate a unique filename for the image
            $imageName = uniqid() . '.' . $image->getClientOriginalExtension();

            // Store the image file in storage/app/public/images directory
            $image->storeAs('public/images', $imageName);

            // Update the image path in the $itemData array
            $itemData['image'] = 'images/' . $imageName;

            // make the image to render in the frontend
            $itemData['image'] = asset('storage/' . $itemData['image']);
        }

        // Create the item
        $item = Item::create($itemData);

        return response([
            'item' => $item
        ], 201);
    }



    /**
     * Display the specified resource.
     */
    public function show()
    {
        if (Auth::check()) {
            $user = Auth::user();
            $items = Item::where('user_id', $user->id)->get();

            return response([
                'items' => $items
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemRequest $request, Item $item)
    {
        $itemData = $request->validated();
        if ($request->hasFile('image')) {
            $image = $request->file('image');

            $imageName = uniqid() . '.' . $image->getClientOriginalExtension();

            $image->storeAs('public/images', $imageName);

            $itemData['image'] = 'images/' . $imageName;

            $itemData['image'] = asset('storage/' . $itemData['image']);

            Storage::delete('public/' . $item->image);
        }
        $item->update($itemData);

        return response([
            'item' => $item
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        $item->delete();
        return response([
            'message' => 'Item deleted successfully'
        ], 200);
    }
}
