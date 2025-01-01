<?php

namespace App\Http\Controllers\admin;

use App\Models\TempImage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;


class TempImageController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'error' => $validator->errors('image')]);
        }
        $file = $request->file('image');
        $filename = $file->getClientOriginalExtension();
        $imageName = strtotime('now') . '.' . $filename;
        $modal = new TempImage();
        $modal->image = $imageName;
        $modal->save();
        $file->move(public_path('uploads/temp'), $imageName);
        $sourcePath = public_path('uploads/temp/' . $imageName);
        $destinationPath = public_path('uploads/temp/thumbnails/' . $imageName);
        $manager = new ImageManager(Driver::class);
        $image = $manager->read($sourcePath);
        $image->coverDown(300, 300);
        $image->save($destinationPath);
        return response()->json(['status' => 'True', 'message' => 'Image Added Successfully', 'data' => $modal]);
    }
}
