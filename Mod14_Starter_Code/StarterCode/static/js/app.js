let url = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json'

//Fetch the JSON data and console log it
function metadata(sample)
{
d3.json(url).then((data) => {
    let dataset = data.metadata;
    let ArrayResults = dataset.filter(sampleObj => sampleObj.id == sample);
    let nextResult = ArrayResults[0];

    let panel = d3.select("#sample-metadata");
    panel.html("");

    for (key in nextResult) {
        panel.append("h6").text(`${key.toUpperCase()}:${nextResult[key]}`)
    };

    //buildGauge(nextResult.wfreq): - this is for the bonus if I need it

  });
};

function charts(sample){
    d3.json(url).then((data) => {

        let samplename = data.samples;
        let resultsArray = samplename.filter(sampleObj => sampleObj.id == sample);
        let results = resultsArray[0];

        let otu_ids = results.otu_ids;
        let otu_labels = results.otu_labels;
        let sample_values = results.sample_values;

        let bubble_layout = {
            title: "OTU Results by Sample Name",
            margin: {t:30},
            hovermode: 'closest',
            xaxis: {title: 'OTU ID'}

        };
        
        let bubble_data = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }];

        Plotly.newPlot("bubble", bubble_data, bubble_layout); 
        //let yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
    })
}

/// preparing data for a horizontal bar chart
function createBarChart(sample) {
    d3.json(url).then((data) => {
        let samplename = data.samples;
        let resultsArray = samplename.filter(sampleObj => sampleObj.id == sample);
        let results = resultsArray[0];

        let otu_ids = results.otu_ids.slice(0, 10);
        let otu_labels = results.otu_labels.slice(0, 10);
        let sample_values = results.sample_values.slice(0, 10);

        let bar_data = [{
            type: 'bar',
            x: sample_values.reverse(), // Reverse to have the largest number at the top
            y: otu_ids.map(id => `OTU ${id}`).reverse(), // Prefix OTU ID and reverse for Plotly's default horizontal layout
            text: otu_labels.reverse(), // Hover text
            orientation: 'h' // Horizontal bar chart
        }];

        let bar_layout = {
            title: 'Top 10 OTUs Found in Individual',
            xaxis: {title: 'Sample Values'},
            yaxis: {title: 'OTU ID'}
        };

        Plotly.newPlot('bar', bar_data, bar_layout);
    });
}

function init(){
    let selector = d3.select("#selDataset");
    d3.json(url).then((data) => {let samplenames = data.names;
    for (let i = 0; i < samplenames.length; i++){
        selector
        .append("option")
        .text(samplenames[i]);
    };
let firstSample = samplenames[0];
metadata(firstSample);
charts(firstSample);
createBarChart(firstSample);
});
}

function optionChanged(newSample){
    metadata(newSample);
    charts(newSample);
    createBarChart(newSample);
}

init();

// let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
// otu_ids.slice(0, 10): This extracts the first 10 elements from the otu_ids 
// otu_ids array to a new string by adding the prefix "OTU " to each element.
// .reverse(): This reverses the order of the resulting array