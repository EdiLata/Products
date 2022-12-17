
import {ReadFeedbackComponent} from "./read-feedback.component";

describe('ReadFeedbackComponent', () => {
    let component: ReadFeedbackComponent;
    let mockMovieService, mockCategoryService;

    beforeEach(() => {
        component = new ReadFeedbackComponent(mockMovieService, mockCategoryService);
    });

    describe('filterFeedback', () => {
        it('should filter the feedback correctly', () => {
            component.feedbackList = [{reason: 'Other', description: 'jsljfdjsdlf'},
                {reason: 'Other', description: 'sjdbfsbkdfihujhk'},
                {reason: 'Bug', description: 'aadas'},
                {reason: 'Suggestion', description: 'too nice'},
                {reason: 'Bug', description: 'Too good this site. Im gelous'}];

            component.filterFeedback('Other');

            expect(component.filteredFeedback.length).toBe(2);
            expect(component.filteredFeedback[0].description).toBe('jsljfdjsdlf');
            expect(component.filteredFeedback[1].description).toBe('sjdbfsbkdfihujhk');
        });
    });
});
