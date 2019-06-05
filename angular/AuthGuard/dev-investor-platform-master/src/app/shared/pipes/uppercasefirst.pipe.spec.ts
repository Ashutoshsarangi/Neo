import { UppercasefirstPipe } from './uppercasefirst.pipe';

describe('UppercasefirstPipe', () => {
    it('create an instance', () => {
        const pipe = new UppercasefirstPipe();
        expect(pipe).toBeTruthy();
    });
});
