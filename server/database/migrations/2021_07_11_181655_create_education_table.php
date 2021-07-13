<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEducationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('education', function (Blueprint $table) {
            $table->softDeletes();
            $table->integerIncrements('id');
            $table->unsignedInteger('user_id');
            $table->string('name');
            $table->string('institution_name');
            $table->string('website')->nullable();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->boolean('present')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('education');
    }
}
