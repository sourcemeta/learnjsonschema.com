import algoliasearch from 'algoliasearch';

console.log("hiiii");
  // Fetch the JSON file
  fetch('{{ .Site.BaseURL}}/algolia_data.json')
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      // Store the JSON data in the variable
      const jsonData = data;
      const client = algoliasearch("EEOKASMLY0", "37ffcc3128ac3f6d1c833bd746718cae");
      const index = client.initIndex('test_index')
      const records = [{ objectID: 1, name: 'test_record', url: "http:core"}, {objectID:2, name: "bandit_call", url:"http:whore1iuwq" }]
      index.saveObjects(jsonData).wait()

      // Search the index and print the results
      index
        .search('core')
        .then(({ hits }) => console.log(hits[0]))
    })
    .catch(error => {
      // Handle any errors
      console.error('Error fetching JSON:', error);
    });

    document.addEventListener('DOMContentLoaded', e => {
        $('#input-datalist').autocomplete()
    }, false);