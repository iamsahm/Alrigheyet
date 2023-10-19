# Inputs

## Microphone

Take data in using the microphone with web audio API.

## Camera

Use the camera to add image data to the visualisation.

## Keyboard

Mutate the canvas using the keyboard.

## Phone

Use the accelerometer of the phone to add data.

# Processing

## Beats

Count the beats per minute of the sound over time and send the data to the visualisation. - Kick drums? Combine with frequency analysis?

## Frequency

Analyse the change in frequency distribution over time and send the data to the visualisation.

## Intensity

Get the sound density/loudness. - volume over time?

## Pictures

-   Take images from the folder
-   Make functions that mutate the image data in some ways
    -   invert
    -   rotate
    -   flip
    -   recolor
    -   blur
    -   line art
    -   SVG?
-   Send the image on to the visualiser

# Outputs

## Canvas

The canvas is the main output of the visualiser. It is the main way of displaying the data.

## Paths

Do path generation based on data from the inputs. - speed set by something that modulates perceived intensity.

## Images

-   Use the parsed image data as a node for a path or something.
