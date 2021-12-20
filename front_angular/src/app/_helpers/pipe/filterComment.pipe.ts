import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'filterComment',
    pure: false
})
export class FilterCommentPipe implements PipeTransform {
    transform(items: any[], filterComment: (item: any) => boolean): any {
        if (!items || !filterComment) {
            return items;
        }
        return items.filter(item => (item.postId == filterComment));
    }
}