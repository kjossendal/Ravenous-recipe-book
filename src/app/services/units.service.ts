import { Unit } from '../shared/unit.model';

export class UnitsService {
    private units: Unit[] = [
        new Unit(1, 'tsp', 'tsp'),
        new Unit(2, 'tbsp', 'tbsp'),
        new Unit(3, 'cup', 'cup'),
        new Unit(4, 'g', 'g'),
        new Unit(5, 'kg', 'kg'),
        new Unit(6, 'lb', 'lb'),
    ];

    getUnits() {
        return this.units.slice();
    }
}