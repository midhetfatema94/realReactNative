function Girl(name) {
    this.name = name
}

Girl.greet = function() {
    console.log('Hello ', this.name );
}

Girl.prototype.greet = function() {
    console.log('Hello ', this.name );
}




class Girl {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log('Hello ', this.name );
    }
}