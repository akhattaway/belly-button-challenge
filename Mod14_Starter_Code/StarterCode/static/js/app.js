let url = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json'

function charts(sample){
    d3.json(url).then((data) => {

        let samplename = data.samples;
        let resultsArray = samplename.filter(sampleObj => sampleObj.id == sample);
        let results = resultsArray[0];


        let otu_id = results.otu_ids;
        let out_labels = results.out_labels;
        let sample_values = results.sample_values;

        let bubble_layout = {
            title: "OTU Results by Sample Name",
            margin: {t:30},
            hovermode: 'closest',
            xaxis: {title: 'OTU ID'}


        };
        
        let bubble_data = [{
            x: otu_id,
            y: sample_values,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_id,
                colorscale: "Earth"
            }
        }];

        plotly.newPlot("bubble", bubble_data, bubble_layout); 
    })
}


/// preparing data for a horizontal bar chart
//let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
// otu_ids.slice(0, 10): This extracts the first 10 elements from the otu_ids 
// otu_ids array to a new string by adding the prefix "OTU " to each element.
// .reverse(): This reverses the order of the resulting array