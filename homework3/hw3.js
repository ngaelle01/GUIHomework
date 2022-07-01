let r, g, b;

function setup() {
    var cnv = createCanvas(720, 400);

    // Center canvas horizontally, but keep height
    var pos = cnv.position();
    pos.x = (windowWidth - width)/2;
    cnv.position(pos.x, pos.y);

    // Pick colors randomly
    r = random(255);
    g = random(255);
    b = random(255);
}

function draw() {
    background(170);
    // Draw a circle
    strokeWeight(2);
    stroke(r, g, b);
    fill(r, g, b, 127);
    ellipse(360, 200, 200, 200);
}

// When the user clicks the mouse
function mousePressed() {
    // Check if mouse is inside the circle
    let d = dist(mouseX, mouseY, 360, 200);
    if (d < 100) {
        // Pick new random color values
        r = random(255);
        g = random(255);
        b = random(255);
    }
}

