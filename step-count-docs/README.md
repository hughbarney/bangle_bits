

# Bangle Step Counter Documentation


## Setting Up the Environment

0 Create a common parent directory for the code repositories
  Lets call this the `src` directory.

1 Clone the Espruino firmware repository
  git clone https://github.com/espruino/Espruino.git

2 Clone the test harness repository
  get clone https://github.com/gfwilliams/step-count.git

3 change into the step count directory and run

      $ cd src/step-count
      $ make && ./main
  
  This will give you a baseline set of results agains the samples in the data
  directory.

4 You can now experiment and make changes to the step count code
  in Espruino/libs/misc/stepcount.c

5 Rerun the test harness and check the results

  NOTE that the harness will include the stepcount.c file

  If accuracy for walking and non walking activities are both improved
  then you have improved the algorithm.

  If accuracy is only improved for non walking activities it will be at the
  expense of step counting when walking.
  


## Key Points

* The step counter is implemented in C as part of the Bangle Firmware
  https://github.com/espruino/Espruino/blob/master/libs/misc/stepcount.c

* An overview of the step counting algorthm is at:
  http://forum.espruino.com/comments/16363670/

* A test harness can be used to run simulations on changes to stepcoint.c
  This enables you to change the C code but just run the test harness on a recording
  rather than actually walking around and counting steps.
  https://github.com/gfwilliams/step-count

* A baseline set of results can be seen at:
  http://forum.espruino.com/comments/16371063/
  This shows accuracy between 98-102%

* It is also possible to experiment using JavaScript on the watch
  This has the advantage that you dont have to compile and flash new firmware
  Sample code can be found at:
  https://github.com/hughbarney/bangle_bits/blob/master/step_counters/steps_312_oxford.js
  
* There is a comaprison against the Oxford Step Counter at 
  http://forum.espruino.com/comments/16208730/
  The Bangle step counter is more accurate and does not count steps when stationary

* A table of time to complete a step below.
  This was used to determine the max and min time between step events 
  http://forum.espruino.com/comments/16122158/

* An explanation why Peak detection was chosen instead of threshold crossing
  http://forum.espruino.com/comments/16147589/
  http://forum.espruino.com/comments/16147596/

* Baseline physical test results against firmware V2.10.27
  This was the point where we first had a good step counter for the Bangle
  http://forum.espruino.com/comments/16194976/

* Some of the Bangles had a DC offset on the accelerometer that would mean steps
  would be detected by tilting the watch.  A simple DC filter was implemented by @jeffmer
  http://forum.espruino.com/comments/16374402/



## Creating Calibrated Step Samples

We use a test harness to test changes to the step counter algorithm.
A series of known accellerometer recordings are fed through the
alogorithm and the step count printed.  These are then compared with
the actual steps recorded when the sample recording was made.


To do this you need to install the Accellog app from
https://banglejs.com/apps/#accellog


### Calibrating a Known Step Counter

The samples should be measured against a known good step counter worn
on the same wrist as the Bangle.

Recommeded devices to measure against are Fitbit Charge HR, AmazFit
Bip or AmazFit GTS.  Tests have found these to be greater than 95%
accurate when walking.

When using other devices we recommend that you first test them out.
Walk a known circular route that comes out at around one mile (approx
2000 steps).  Use a GPS to establish the distance.  Walk the same
route up to three times and check that the step count comes in close
to the expected value.

Once you have satified yourself that your other smartwatch is a good
step counter it can be used as a refence for the Bangle accelerometer
recordings.


### Types of Test Recordings

The following types of tests have been found to be useful

1) WALKING - Walking a 1 mile circuit (accurate step count)
2) SLEEPING - Sleeping overnight (ideally no steps counted)
3) DRIVING 15 minutes or 30 minutes  (ideally no steps counted)
4) SITTING at a Desk for 4 hours typing (ideally no steps counted)

Pretty much anyone can write a plausable step counter that will look
like it counts steps when walking.  This is only 10% of the problem.
The hardest part is ensuring that the step counter does not count
steps when not walking, when sleeping or sitting watching TV.  It is
therefore essential to include non stepping tests.


### Process for getting a good sample

- Where the Bangle on the same wrist as the known step counter.
- At the start of the walk note the step count on the known step counter.
- Start the accelerometer recorder.
- Walk the measured distance.
- Stop the acceleromter recorder
- Make a note of the count on the know step counter
- Work out the steps counted by end_count - start_count
- Download the acceleroeter CSV file
- rename the log to something meaningful.

name-type-count.csv


### Downloadind the Sample CSV file

- Go to the Bangle.js App Loader
- Connect to your Bangle
- Under My Apps look for Acceleration Logger
- You'll see a download arrow next to it - click that
- You can now choose to Save the data you've recorded, and then please upload it here!


Hugh Barney - September 2022
