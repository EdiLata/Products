
import {RatingComponent} from "./rating.component";

describe('RatingComponent', () => {
    let component: RatingComponent;
    let mockAngularFireStorage, mockAuthService, mockMovieService;

    beforeEach(() => {
        component = new RatingComponent(mockAngularFireStorage, mockAuthService, mockMovieService);
    });

    describe('onSubmit', () => {
        it('should not insert the comment if the form has required fields uncompleted', () => {

            component.onSubmit({rating: 1, comment: '', title: ''});

            expect(component.formTemplate.valid).toBe(false);
            expect(component.formTemplate.value.comment).toBe('');
        });
    });

    describe('resetForm', () => {
        it('should reset the form to an initial value', () => {
            component.resetForm();

            expect(component.formTemplate.value).toEqual({rating: 1, comment: '', title: ''});
        });
    });
});