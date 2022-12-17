import {FeedbackComponent} from "./feedback.component";

describe('FeedbackComponent', () => {
    let component: FeedbackComponent;
    let mockAngularFireStorage, mockAuthService, mockMovieService;

    beforeEach(() => {
        component = new FeedbackComponent(mockAngularFireStorage, mockAuthService, mockMovieService);
    });

    describe('onSubmit', () => {
        it('should not insert the feedback if the form has required fields uncompleted', () => {

            component.onSubmit({reason: 'Other', description: ''});

            expect(component.formTemplate.valid).toBe(false);
            expect(component.formTemplate.value.description).toBe('');
        });
    });

    describe('resetForm', () => {
        it('should reset the form to an initial value', () => {
            component.resetForm();

            expect(component.formTemplate.value).toEqual({reason: 'Other', description: ''});
        });
    });
});
