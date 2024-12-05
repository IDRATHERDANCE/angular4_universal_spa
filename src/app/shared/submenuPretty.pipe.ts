import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({ name: 'subMenuPretty' })

@Injectable({
    providedIn: 'root'
})

export class SubMenuPrettyPipe implements PipeTransform {
    transform(value: string): string {
        return value.replace(/-/g, ' ').toLowerCase();
    }

}
