const http = require('http');
const fs = require('fs');

const nodes = fs.readFileSync(`${__dirname}/data.json`, 'utf-8')

const html = 
    `<script src="https://balkan.app/js/FamilyTree.js"></script>
        <div id="tree"></div>';
    <script>
        var family = new FamilyTree(document.getElementById("tree"), {
            mouseScrool: FamilyTree.action.none,
            enableDragDrop: true,
            nodeBinding: {
                field_0: "name"
            }
        });
        family.load({%NODES%})
    </script>`;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html'});

    const output = html.replace('{%NODES%}', nodes)

    res.end(output);
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000')
})