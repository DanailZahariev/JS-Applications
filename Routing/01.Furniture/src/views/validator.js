export function validateData(data) {
    let result = {
        make: '',
        model: '',
        year: '',
        description: '',
        price: '',
        img: ''
    }

    result.make = data.make.length >= 4 ? 'is-valid' : 'is-invalid';
    result.model = data.model.length >= 4 ? 'is-valid' : 'is-invalid';
    result.year = (data.year >= 1950 && data.year <= 2050) ? 'is-valid' : 'is-invalid';
    result.description = data.description.length >= 10 ? 'is-valid' : 'is-invalid';
    result.price = data.price > 0 ? 'is-valid' : 'is-invalid';
    result.img = data.img !== '' ? 'is-valid' : 'is-invalid';

    return result
}