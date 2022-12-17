import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    categories: {
        name: string;
        color: string;
    }[] = [];
    reasonList: any[];
    private colors: string[] = ['#0091EA', '#F4511E', '#6DAE43'];

    getCategories(items: any[]) {
        let categoryNames = new Set<string>();
        let index = 0;
        this.categories = [];
        items.forEach(item => {
            categoryNames.add(item.category);
        });
        categoryNames.forEach(item => {
            this.categories.push(
                {
                    name: item,
                    color: this.colors[index] ? this.colors[index] : this.colors[Math.floor(Math.random() * this.colors.length)]
                });
            index++;
        });
        return this.categories;
    }

    getReasons(items: any[]) {
        let reasons = new Set<string>();
        this.reasonList = [];
        items.forEach(item => {
            reasons.add(item.reason);
        });
        reasons.forEach(item => {
            this.reasonList.push(item);
        });
        return this.reasonList;
    }

    getColor(item: any): string {
        return this.categories.find(c => c.name === item.category).color;
    }
}
