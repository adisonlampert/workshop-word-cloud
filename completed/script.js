const colorSchemes = {
  "Default": ["#00CCCC", "#89da59", "#80bd9e", "#ff420e"],
  "Cool": ["#003b46", "#07575b", "#66a5ad", "#c4dfe6"],
  "Nature": ["#2e4600", "#486b00", "#a2c523", "#7d4427"],
  "Vibrant": ["#375e97", "#fb6542", "#ffbb00", "#ffbb00"],
  "Delicate": ["#98dbc6", "#5bc8ac", "#e6d72a", "#f18d9e"],
  "Beach": ["#f4cc70", "#de7a22", "#20948b", "#6ab187"],
  "Autumn": ["#8d230f", "1e434c", "#9b4f0f", "#c99e10"],
  "Ice": ["#f1f1f2", "#bcbabe", "#a1d6e2", "#1995ad"],
  "Citrus": ["#eb8a44", "#f9dc24", "#4b7447", "#8eba43"]
}

const commonWords = ["the", "be", "to", "of", "and", "a", "in", "that", "have", "it", "for", "not", "on", "with", "he", "as", "you", "do", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "no", "its", "was", "i", "had", "could", "went", "how", "were", "way", "much", "is", "said", "think", "thought", "then", "down", "very", "again", "now", "quite", "im", "know", "off", "see", "into", "ill", "here", "such", "must", "did", "are", "got", "some", "your", "are", "them", "any", "has", "never", "only", "am", "more", "has", "been", "should", "other", "though", "dont", "didnt", "after", "came", "over", "come", "just", "back", "looked", "going", "before", "new", "us", "him", "something", "around", "turned", "want", "saw", "through", "made", "knew", "let", "shall", "himself", "take", "took", "well", "soon", "where", "last", "thing", "always", "little", "great", "good", "really", "too", "says", "feel", "than", "even", "enough", "under", "even", "long", "does", "why", "makes", "used", "behind", "things", "nothing", "above", "still", "upon", "every", "heard", "opening", "mans", "grew", "increase", "increased", "many", "whole", "put", "right", "each", "open", "large", "felt", "look"]

const sample = "A Hanuted House by Virgina Woolf Whatever hour you woke there was a door shutting From room to room they went hand in hand lifting here opening there making sure a ghostly couple Here we left it she said And he added Oh but here tool It s upstairs she murmured And in the garden he whispered Quietly they said or we shall wake them But it wasn t that you woke us Oh no They re looking for it they re drawing the curtain one might say and so read on a page or two Now they ve found it one would be certain stopping the pencil on the margin And then tired of reading one might rise and see for oneself the house all empty the doors standing open only the wood pigeons bubbling with content and the hum of the threshing machine sounding from the farm What did I come in here for What did I want to find My hands were empty Perhaps its upstairs then The apples were in the loft And so down again the garden still as ever only the book had slipped into the grass But they had found it in the drawing room Not that one could ever see them The windowpanes reflected apples reflected roses all the leaves were green in the glass If they moved in the drawing room the apple only turned its yellow side Yet the moment after if the door was opened spread about the floor hung upon the walls pendant from the ceiling what My hands were empty The shadow of a thrush crossed the carpet from the deepest wells of silence the wood pigeon drew its bubble of sound Safe safe safe the pulse of the house beat softly The treasure buried the room the pulse stopped short Oh was that the buried treasure A moment later the light had faded Out in the garden then But the trees spun darkness for a wandering beam of sun So fine so rare coolly sunk beneath the surface the beam I sought always burned behind the glass Death was the glass death was between us coming to the woman first hundreds of years ago leaving the house sealing all the windows the rooms were darkened He left it left her went North went East saw the stars turned in the Southern sky sought the house found it dropped beneath the Downs Safe safe safe the pulse of the house beat gladly The Treasure yours The wind roars up the avenue Trees stoop and bend this way and that Moonbeams splash and spill wildly in the rain But the beam of the lamp falls straight from the window The candle burns stiff and still Wandering through the house opening the windows whispering not to wake us the ghostly couple seek their joy Here we slept she says And he adds Kisses without number Waking in the morning Silver between the trees Upstairs In the garden When summer came In winter snowtime The doors go shutting far in the distance gently knocking like the pulse of a heart Nearer they come cease at the doorway The wind falls the rain slides silver down the glass Our eyes darken we hear no steps beside us we see no lady spread her ghostly cloak His hands shield the lantern Look he breathes Sound asleep Love upon their lips Stooping holding their silver lamp above us long they look and deeply Long they pause The wind drives straightly the flame stoops slightly Wild beams of moonlight cross both floor and wall and meeting stain the faces bent the faces pondering the faces that search the sleepers and seek their hidden joy Safe safe safe the heart of the house beats proudly Long years he sighs Again you found me Here she murmurs sleeping in the garden reading laughing rolling apples in the loft Here we left our treasure Stooping their light lifts the lids upon my eyes Safe safe safe the pulse of the house beats wildly Waking I cry Oh is this your buried treasure The light in the heart";

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

// create an onclick function to generate a word cloud based on the user's input into the text box
document.getElementById("generate").onclick = function() {

  var mode = document.querySelector('input[name="mode"]:checked').value;
  var colorSelection = document.querySelector('input[name="colorScheme"]:checked').value;
  var scale = document.querySelector('input[name="scales"]:checked').value;
  var wordSpacing = document.getElementById("display").innerHTML;

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
  customColorScale.colors(colorSchemes[colorSelection]);

  if(mode == "Rectangle"){
      chart.mode("rect");
    }

  if(scale == "Logarithmic") {
    chart.scale(anychart.scales.log());
  }

  // set text spacing
  chart.textSpacing(wordSpacing);

  // set the color scale as the color scale of the chart
  chart.colorScale(customColorScale);
  // display the word cloud chart
  chart.container("cloud-container");
  chart.draw();

}

var slider = document.getElementById("myRange");
var output = document.getElementById("display");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}