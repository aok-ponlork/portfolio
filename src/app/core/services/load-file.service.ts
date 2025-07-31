import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadFileService {
  constructor(private http: HttpClient) {}

  async loadFileAsync(filePath: string): Promise<string> {
    try {
      const content = await firstValueFrom(
        this.http.get(filePath, { responseType: 'text' })
      );
      return content;
    } catch (error) {
      console.error('Error loading markdown file:', error);
      throw error;
    }
  }
}

