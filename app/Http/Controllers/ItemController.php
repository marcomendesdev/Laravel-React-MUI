<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\ItemResource;
use Illuminate\Support\Facades\Auth;

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
        $item = Item::create($request->validated());
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
        // update item
        $item->update($request->validated());
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
