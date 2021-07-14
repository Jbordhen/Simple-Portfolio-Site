<?php

namespace App\Http\Controllers;

use App\Models\Education;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EducationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $educations = Education::where()
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|min:3',
            'institution_name' => 'required|string|max:255|min:3',
            'website' => 'string|url|nullable',
            'start_date' => 'required|date',
            'end_date' => 'date|nullable',
            'present' => 'boolean'
        ]);
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        $education = Education::make($request->toArray());
        $education->user_id = auth()->user()->id;
        $education->save();
        return response($education, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Education  $education
     * @return \Illuminate\Http\Response
     */
    public function show(Education $education)
    {
        return response($education, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Education  $education
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Education $education)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|min:3',
            'institution_name' => 'required|string|max:255|min:3',
            'website' => 'string|url',
            'start_date' => 'required|date',
            'end_date' => 'date|nullable',
            'present' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $education->name = $request->name;
        $education->website = $request->website;
        $education->start_date = $request->start_date;
        $education->end_date = $request->end_date;
        $education->present = $request->present ? $request->present : false;
        // $education->user_id = auth()->user()->id;

        $education->update();

        return response($education, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Education  $education
     * @return \Illuminate\Http\Response
     */
    public function destroy(Education $education)
    {
        $education->delete();
        return response(['message' => "Education was removed successfully"], 200);
    }
}
