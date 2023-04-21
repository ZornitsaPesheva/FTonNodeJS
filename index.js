const http = require('http');
const fs = require('fs');

const file = `${__dirname}/data.json`;
const nodes = fs.readFileSync(file, 'utf-8')
const html = 
    `<script src="https://balkan.app/js/FamilyTree.js"></script>
        <div id="tree"></div>';
    <script>
        let family = new FamilyTree(document.getElementById("tree"), {
            mouseScrool: FamilyTree.action.none,
            enableDragDrop: true,
            nodeBinding: {
                field_0: "name"
            }
        });
        
        family.onUpdateNode((args) => {
           console.log({%NODES%});
           console.log(family.config.nodes);

        });

        family.load({%NODES%})
    </script>`;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html'});

    const output = html.replaceAll('{%NODES%}', nodes).replace('{%NODES%}', file)

    res.end(output);
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000')
})