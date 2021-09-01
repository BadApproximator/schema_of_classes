class Mannequin {
    constructor() {
        /** all measurements interested for us */
        init_measures();
        /** all morphs on mannequin */
        init_morphs();
        /** meshes or smth else (?) */
        this.lines = [];
    }
    /* get morph(name) {
        for (let m in this.morphs) {
            if (m.name == name)
                return m;
        }
        throw new Error(`Morph ${name} doesn't exist.`);
    } */
    init_measures(measures) {
        /**TODO: hardcoding for setting names, morphs, lines of each measures */

    }
    init_morphs(morphs) {
        /**TODO: get name, factor and measure from morph */
    }
    get measure(name) {
        for (let m in this.measures) {
            if (m.name == name)
                return m;
        }
        throw new Error(`Measure ${name} doesn't exist.`);
    }
    set_descends() {
        /** TODO: set relations between measures (hardcoding), fill decsends fields */
    }
    update_measure(measure, value) {
        const morph = measure.morph;
        const morph_factor = this.find_factor(measure, morph, value);
        morph.factor = morph_factor;
        for (let descend in measure.descends) {
            descend.update_bounds();
        }
    }
    /** Bisection method */
    find_factor(measure, value, accuracy = 10e-3) {
        let x, dx;
        const line = measure.line;
        let L = 0, R = 1;
        while (R - L > accuracy) {
            dx = (R - L) / 2;
            x = L + dx;
            if (line.calc_len(x) < value)
                L = x;
            else R = x;
        }
    }
}

class Morph {
    constructor(name = "") {
        this.name = name;
        this.measure = null; /** is it neccesary for us? */
        this.factor = null;
    }
}

class Measure {
    constructor() {
        this.name = null;
        this.morph = null;
        this.line = null;
        this.lower_bound = null; /** line length when factor equals to 0 */
        this.upper_bound = null; /** line length when factor equals to 1 */
        this.descends = []; /** those measurements that depend from this one */
    }
    /** update bounds when parent measurement was updated */
    update_bounds() {
        this.lower_bound = line.calc_len(0);
        this.upper_bound = line.calc_len(1);
    }
}

class Line {
    constructor() {
        this.name = null;
        this.mesh = null;
        this.morph = null;
    }
    get len() {
        return this.calc_len(this.morph.factor);
    }
    calc_len(morph_factor) {
        let l;
        /** TODO: calcucation */
        return l;
    }
}

