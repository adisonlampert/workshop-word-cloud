# Word Cloud Generator
## Part 1: Prerequisites
You should have a basic understanding of:
- HTML
- CSS
- JavaScript

## Part 2: Setup
### Setting up your code environment on Repl.it
Repl.it is an online code editor where you can build your word cloud generator. You don't need to use Repl.it but it is recommended. 

To get started, fork [this project](https://replit.com/@AddyLampert/Word-Cloud-Starter-Code) which contains your starter code. Just go here and your coding environment will spin up in just a few seconds!

You should see somethig like the following:

Click on the **FORK** button on the top and you are good to go!

## Part 3: Understanding the Starter Code
Let's first have a look at our starter code. 
### 1) index.html 
In our `index.html` file, we have a `row` div which is going to contain our text box for users to input data and customization options. 

Below that div is `cloud-container` which is where we are going to put the completed word cloud. 

There are three script tags in `index.html`:

    <!-- AnyChart Base Script -->
    <script src="https://cdn.anychart.com/releases/v8/js/anychart-base.min.js"></script>
    <!-- AnyChart Word Cloud Script -->
    <script src="https://cdn.anychart.com/releases/v8/js/anychart-tag-cloud.min.js"></script>

    <script src="script.js"></script>
  
  We are going to use [AnyChart's Core and Tag Cloud modules](https://docs.anychart.com/Basic_Charts/Tag_Cloud) to create our word cloud generator. AnyChart is a flexible JavaScript-based solution that allows developers to embed interactive and great looking charts and dashboards into any web, standalone, or mobile project. It's free and easy to use. 

### 2) style.css 
Some of the project's CSS has already been added for you, but feel free to go back through it later and play around with the code later to adjust the appearance of the word cloud generator.

### 3) script.js
There are three const variables in `script.js` that will be useful to us. 

`colorSchmes` is a dictionary that contains the name of a color scheme and an array of four colors in that color scheme. We'll be using this dictionary to make our word clouds colorful.

`commonWords` is an array of common English words. We're going to use this list to remove common words from our word clouds to make them more meaningful.

`sample` is a string that contains Virgina Woolf's short story "A Haunted House" which we'll use to test our word cloud. 

## Part 4: Generating a Word Cloud

### Create a Word Cloud
Before we get into building the customization options, let's build a word cloud. Go to `script.js` and add this code to the next line of the document:

    // create a word cloud chart
    var chart = anychart.tagCloud();

    // fill the chart with data
    chart.data(sample, {
      mode: "byWord", 
      maxItems: 12,
      ignoreItems: commonWords
    });

    // display the word cloud chart in the div "cloud-container"
    chart.container("cloud-container"); 
    chart.draw();

Reload your page and you'll see a word cloud! If you hover over the words, you can see the frequency of the word and the percentage of the total. Cool, huh?

`anychart.tagCloud()` creates a Word Cloud graph object that we can fill with data usig the `.data` function. The `.data` function takes in two parameters: the text to use as data and a dictionary of key-value pairs that dictate how to parse and display the data. 

`mode` indicates how to read the text and the two options are `byWord` and `byChar`. Try switching the mode to `byChar` to see what that looks like. `maxItems` decides how many words/characters to display. We've chosen 12 for no particular reason so feel free to play around with that setting as well. `ignoreItems` takes in a list of words to ignore. We don't really care about common words so we've created a list and our word cloud excludes those words.

### Set the Color Scheme
Next, let's set the color scheme. 

    // fill the chart with data
    chart.data(sample, {
      mode: "byWord", 
      maxItems: 12,
      ignoreItems: commonWords
    });

    // create and configure a color scale.
    var customColorScale = anychart.scales.linearColor();
    customColorScale.colors(colorSchemes["Default"]);

    // set the color scale as the color scale of the chart
    chart.colorScale(customColorScale);

    // display the word cloud chart in the div "cloud-container"
    chart.container("cloud-container"); 
    chart.draw();

If you reload the page, you'll see a new color scheme. `anychart.scales.linearColor()` sets the color scale to linear. The other option is `anychart.scales.ordinalColor` but it doesn't look as nice in my option. `.colors` sets the color scheme and takes in a list of strings that are either recognized color keywords or hexidecimal codes. The starter code has a list of color schemes and we're using the "Default" color scheme here. Change "Default" to any of the other items from the `colorSchemes` list to see what happens.

## Part 4: Building the Word Cloud Generator

### Use Text From User input
First, let's create a textbox for users to input their text. In `index.html`, paste this text below the `instructions` div on line 16 so that your code looks like this:

##### index.html
    <div class="custom-container">
      <div class="instructions">
        <p class="tool-header"> Type/Paste Text Here </p>
        <p>Paste or type your text to generate your free word cloud</p>
      </div> 
      <div class="input-group">
        <textarea class="form-control" aria-label="With textarea" id="input-text"></textarea>
      </div> 
    </div>

Style it in CSS.

##### style.css 
    .input-group {
      width: 450px;
    }

    #input-text {
      width: 90%;
      height: 245px;
      padding: 10px;
      border-radius: 10px;
      margin: 5px 40px 0px 10px;
      outline: none !important;
      font-family: 'Poppins', sans-serif;
      resize: none;
    }

Nice! Now, you've got a text box. Isn't that neat? Let's hook it up so that it actually works. 

First, we'll need a submit button. Go back to your `index.html` and add a button to the `options` div:

##### index.html

    <div class="options">
      <div class="other-settings">
        <button class="button" id="generate">GENERATE</button>
      </div>
    </div>

##### style.css
    .button {
      background-color: #47B6FF;
      border: none;
      color: white;
      padding: 10px 25px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      cursor: pointer;
      border-radius: 15px;
    }
    
    .button:active, 
    .button:hover {
      background-color: #0062A3;
    }

Now that we've got a button, let's add the Javascript. Delete your current word cloud generation code and copy paste the code below.

##### script.js

    // create an onclick function to generate a word cloud based on the user's input into the text box
    document.getElementById("generate").onclick = function() {

    // clear the container in case it currently has a word cloud in it
    document.getElementById("cloud-container").innerHTML = "";

    // set text equal to sample in case text box is empty upon submission
    var text = '';
    if(document.getElementById('input-text').value == ""){
      text = sample;
    }
    // else fill it with the text from the text bos
    else {
      var text = document.getElementById('input-text').value;
    }
    
    // remove non-alphabet characters and convert everything to lower case
    var cleanedText = text.replace(/[^a-zA-Z ]/g, "").toLowerCase();

    // create a chart
    var chart = anychart.tagCloud();
    chart.data(cleanedText, {
      mode: "byWord",
      maxItems: 12,
      ignoreItems: commonWords
    });

    // create and configure a color scale.
    var customColorScale = anychart.scales.linearColor();
    customColorScale.colors(colorSchemes["Default"]);

    // set the color scale as the color scale of the chart
    chart.colorScale(customColorScale);
    // display the word cloud chart
    chart.container("cloud-container");
    chart.draw();

    }

The script above creates a function that runs when the user clicks the button. `text.replace(/[^a-zA-Z ]/g, "").toLowerCase()` formats the text entry by using regex to remove any characters that are not alphabetic and then converts all the letters to lowercase. This makes it easier to parse the data and determine which words are the most common. In data science, this process is called "cleaning" our dataset. 

Try out your new code by typing in your own words or using a website like Project Gutenberg to get a free text file of classic novels. 
 spice :sparkles:. 

## Part 5: Allow Users to Customize the Color Scheme
Now that we have a fully functioning word cloud generator, let's add some :sparkles: spice :sparkles:. First, let's allow users to choose their own color scheme from one of our premade color schemes. 

Add a radio selection input to your `index.html` that looks like this:

##### index.html

    <div class="color-picker">
      <p> COLOR SCHEME </p>
      <div class="radio">
        <label class="radio-container">Default
          <input type="radio" checked="checked" value="Default" name="colorScheme">
          <span class="checkmark"></span>
        </label>
        <label class="radio-container">Cool
          <input type="radio" value="Cool" name="colorScheme">
          <span class="checkmark"></span>
        </label>
        <label class="radio-container">Nature
          <input type="radio" value="Nature" name="colorScheme">
          <span class="checkmark"></span>
        </label>
        <label class="radio-container">Vibrant
          <input type="radio" value="Vibrant" name="colorScheme">
          <span class="checkmark"></span>
        </label>
        <label class="radio-container">Delicate
          <input type="radio" value="Delicate" name="colorScheme">
          <span class="checkmark"></span>
        </label>
        <label class="radio-container">Beach
          <input type="radio" value="Beach" name="colorScheme">
          <span class="checkmark"></span>
        </label>
        <label class="radio-container">Autumn
          <input type="radio" value="Autumn" name="colorScheme">
          <span class="checkmark"></span>
        </label>
        <label class="radio-container">Ice
          <input type="radio" value="Ice" name="colorScheme">
          <span class="checkmark"></span>
        </label>
        <label class="radio-container">Citrus
          <input type="radio" value="Citrus" name="colorScheme">
          <span class="checkmark"></span>
        </label>
      </div>
    </div>

Now, we have a radio selection with all of our premade colors. Since `Default` is our default, we set `checked="checked"`. We can style it to make it look nicer by hiding the browser's default radio button and creating our own. 

##### style.css

    /* Hide the browser's default radio button */
    .radio input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }

    /* Create a custom radio button */
    .checkmark {
      position: absolute;
      top: 5px;
      left: 0;
      height: 15px;
      width: 15px;
      background-color: white;
      border-radius: 50%;
    }

    /* On mouse-over, add a grey background color */
    .radio-container:hover input ~ .checkmark {
      background-color: #85CEFF;
    }

    /* When the radio button is checked, add a blue background */
    .radio-container input:checked ~ .checkmark {
      background-color: #47B6FF;
    }

    /* Create the indicator (the dot/circle - hidden when not checked) */
    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }

    /* Show the indicator (dot/circle) when checked */
    .radio-container input:checked ~ .checkmark:after {
      display: block;
    }

    /* Style the indicator (dot/circle) */
    .radio-container .checkmark:after {
      top: 5px;
      left: 5px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: white;
    }

    .color-picker {
      margin-left: 10px;
    }

    .radio-container {
      display: block;
      position: relative;
      padding-left: 25px;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

Looking good! Now, we just need to add a few lines to our `onclick` function and we'll be good to go. In `script.js` create a variable called `colorSelection`.

##### script.js 

    // get the selected color scheme choice
    var colorSelection = document.querySelector('input[name="colorScheme"]:checked').value;

Now that we have a variable `colorSelection` which contains the name of the color scheme the user wants, we can set the custom color scale to the selection by replacing our current code with:

##### script.js

    // create and configure a color scale.
    var customColorScale = anychart.scales.linearColor();
    customColorScale.colors(colorSchemes[colorSelection]);
  
Try it out! 

## Part 6: More Customization Options

Let's add customization options for the mode (spiral vs. rectangle), the scale (linear vs. logarithmic), and text spacing.

### Mode and Scale

To create options for mode and scale, let's use radio input selections again. Add the radio inputs in you `index.html` like this:

##### index.html

    <div class="other-settings">
      <div class="right-settings">
        <div class="radio">
          <p> MODE </p>
          <label class="radio-container">Spiral
            <input type="radio" checked="checked" value="Spiral" name="mode">
            <span class="checkmark"></span>
          </label>
          <label class="radio-container">Rectangle
            <input type="radio" value="Rectangle" name="mode">
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="radio scales">
          <p> SCALES </p>
          <label class="radio-container">Linear
            <input type="radio" checked="checked" value="Linear" name="scales">
            <span class="checkmark" ></span>
          </label>
          <label class="radio-container">Logarithmic
            <input type="radio" value="Logarithmic" name="scales">
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
      <button class="button" id="generate">GENERATE</button>
    </div>

Let's style the `div` so that the Mode and Scale options are side by side using Flexbox. Paste this CSS into `style.css`.

##### style.css

    .right-settings {
      display: flex;
    }

    .scales {
      margin-left: 20px;
    }

To get it functioning, we'll use the same process as before. Add in two variables named `mode` and `scale` to `script.js`.

##### script.js 

    var mode = document.querySelector('input[name="mode"]:checked').value;
    var scale = document.querySelector('input[name="scales"]:checked').value;

The default AnyChart Word Cloud settings have the mode as "Spiral" and the scale as "Linear" so we only need to change the settings if the user selects "Rectangle" for mode or "Logarithmic" for  scale. Add this code underneath your color scheme selection code. 

##### script.js 

    if(mode == "Rectangle"){
      chart.mode("rect");
    }

    if(scale == "Logarithmic") {
      chart.scale(anychart.scales.log());
    }

Before moving on, explore the different options to see what they do. 

### Text spacing

Another cool option is to change the spacing between the words. To do this, we're going to create a slider. Add this code directly above your button. 

##### index.html

    <p class="second-setting">TEXT SPACING</p>
    <input type="range" min="1" max="30" value="1" class="slider" id="myRange">
    <p>Value: <span id="demo"></span></p>

The slider is pretty ugly so let's restyle it. We do the same thing that we did with the radio buttons. We're going to hide the default style and create our own. 

##### style.css
    .slidecontainer {
      width: 100%;
    }

    .slider {
      -webkit-appearance: none;
      width: 250px;
      height: 10px;
      background: white;
      border-radius: 20px;
      outline: none;
    }

    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 17px;
      height: 17px;
      border-radius: 50%;
      background: #47B6FF;
      cursor: pointer;
    }

    .slider::-moz-range-thumb {
      width: 17px;
      height: 17px;
      background: #47B6FF;
      cursor: pointer;
    }

Our slider looks fantastic, but it doesn't work. Let's fix that. Add this code at the bottom of your `script.js` outside of the `onclick` function. 

##### script.js

    var slider = document.getElementById("myRange");
    var output = document.getElementById("display");
    output.innerHTML = slider.value;

    slider.oninput = function() {
      output.innerHTML = this.value;
    }

This code takes the value of the slider input and displays it in the paragraph below so the user can see the numeric value. Try it out. 

Now, let's add code to set the text spacing based on the user input. Inside of your `onclick` function, create a variable called `wordSpacing`.

##### script.js
    var wordSpacing = document.getElementById("display").innerHTML;

Below the color scheme selection code, add the following lines:

##### script.js

    // set text spacing
    chart.textSpacing(wordSpacing);

Woohoo! Your word cloud generator is almost complete. Play around with the text spacing slider to see how it works. 

## Part 7: Finishing Touches

### Create Default Word Cloud 
Let's create a word cloud when the page loads so that the user can see what a default word cloud looks like. To do this, we are going to create an `onload` function. 

##### script.js

    document.getElementById("container").onload = function() {
      
      // set placeholder text
      document.getElementById("input-text").placeholder = sample;

      // create a chart
      var chart = anychart.tagCloud();
      chart.data(sample, {
        mode: "byWord",
        maxItems: 12,
        ignoreItems: commonWords
      });

      // create and configure a color scale.
      var customColorScale = anychart.scales.linearColor();
      customColorScale.colors(colorSchemes["Default"]);

      // set the color scale as the color scale of the chart
      chart.colorScale(customColorScale);
      // display the word cloud chart
      chart.container("cloud-container");
      chart.draw();

    };

And now you've got a gorgeous word cloud generator. Congratulations!

![Congratulations Gif](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2F5mCQOcUfywmyI%2Fgiphy.gif&f=1&nofb=1)

## Part 8: Ways to Keep Hacking

Here are some ideas to improve your word cloud generator:

- Add the ability to upload a text file
- Feature to download the generated word cloud as a jpeg
- Add more customization options
- Allow user to generate their own color scheme 