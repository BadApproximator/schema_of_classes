class Mannequin {
    constructor() {
        /** all measurements interested for us */
        this.measures = [];
        this.init_measures(this.measures);
    }
    init_measures(measures) {
        /**TODO: hardcoding for setting names, morphs, lines of each measures */
        measures.push(new Measure("height_measure", "height_morph", "height_line", ["knee_measure", "thigh_measure"]));
        measures.push(new Measure("knee_measure", "knee_morph", "knee_line", []));
        measures.push(new Measure("thigh_measure", "thigh_morph", "thigh_line", ["knee_measure"]));
    }
    get_measure(name) {
        for (let m of this.measures) {
            if (m.name == name)
                return m;
        }
        throw new Error(`Measure ${name} doesn't exist.`);
    }
    update_measure(measure_name, value) {
        const measure = this.get_measure(measure_name);
        const morph = measure.morph;
        const morph_factor = this.find_factor(measure, value);
        this.set_morph_factor(morph, morph_factor);
        for (let descend of measure.descends){
            const m = this.get_measure(descend);
            m.update_bounds();
        }
    }
    /** Bisection method */
    find_factor(measure, value, accuracy = 1e-3) {
        let x, dx;
        let L = 0, R = 1;
        while (R - L > accuracy) {
            dx = (R - L) / 2;
            x = L + dx;
            if (measure.calc_len(x) < value)
                L = x;
            else R = x;
        }
        return x;
    }
    set_morph_factor(morph, factor){
        // TODO
    };
}

class Morph {
    constructor(name = "") {
        this.name = name;
        this.measure = null; /** is it neccesary for us? */
        this.factor = null;
    }
}

class Measure {
    constructor(name, morph, line, descends = []) {
        this.name = name;
        this.morph = morph;
        this.line = line;
        this.lower_bound = null; /** line length when factor equals to 0 */
        this.upper_bound = null; /** line length when factor equals to 1 */
        this.descends = descends; /** those measurements that depend from this one */
        this.update_bounds();
    }
    calc_len(morph_factor){
        // TODO
        return 0.5;
    };
    /** update bounds when parent measurement was updated */
    update_bounds() {
        this.lower_bound = this.calc_len(0);
        this.upper_bound = this.calc_len(1);
    }
}
