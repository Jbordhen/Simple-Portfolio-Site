<?php

namespace App\Http\Controllers;

use App\Models\WorkExperience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WorkExperienceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
            'company_name' => 'required|string|max:255|min:3',
            'website' => 'string|url|nullable',
            'designation' => 'required|string|min:3|max:255',
            'description' => 'required|string|max:5000',
            'start_date' => 'required|date',
            'end_date' => 'date|nullable',
            'present' => 'boolean'
        ]);
        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }
        $workExperience = WorkExperience::make($request->toArray());
        $workExperience->user_id = auth()->user()->id;
        $workExperience->save();
        return response($workExperience, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\WorkExperience  $workExperience
     * @return \Illuminate\Http\Response
     */
    public function show(WorkExperience $workExperience)
    {
        return response(['work_experience' => $workExperience], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\WorkExperience  $workExperience
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, WorkExperience $workExperience)
    {
        $validator = Validator::make($request->all(), [
            'company_name' => 'required|string|max:255|min:3',
            'website' => 'string|url',
            'designation' => 'required|string|min:3|max:255',
            'description' => 'string|max:5000',
            'start_date' => 'required|date',
            'end_date' => 'date',
            'present' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $workExperience->company_name = $request->company_name;
        $workExperience->website = $request->website;
        $workExperience->designation = $request->designation;
        $workExperience->description = $request->description;
        $workExperience->start_date = $request->start_date;
        $workExperience->end_date = $request->end_date;
        $workExperience->present = $request->present ? $request->present : false;

        $workExperience->update();
        return response($workExperience, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\WorkExperience  $workExperience
     * @return \Illuminate\Http\Response
     */
    public function destroy(WorkExperience $workExperience)
    {
        $workExperience->delete();
        return response(['message' => "Work Experience was removed successfully"], 200);
    }
}
