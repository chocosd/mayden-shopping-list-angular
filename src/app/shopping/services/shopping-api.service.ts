import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ShoppingCart, ShoppingItem, SlimShoppingItem } from '../models/shopping-item.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/shopping-items`;

  public addShoppingItem(item: SlimShoppingItem): Observable<ShoppingCart> {
    return this.httpClient.post<ShoppingCart>(this.apiUrl, item);
  }

  public updateShoppingItem(id: string, item: Partial<ShoppingItem>): Observable<ShoppingCart> {
    return this.httpClient.patch<ShoppingCart>(`${this.apiUrl}/${id}`, item);
  }

  public removeShoppingItem(id: string): Observable<ShoppingCart> {
    return this.httpClient.delete<ShoppingCart>(`${this.apiUrl}/${id}`);
  }

  public addShoppingItems(items: SlimShoppingItem[]): Observable<ShoppingItem[]> {
    return this.httpClient.post<ShoppingItem[]>(this.apiUrl, items);
  }

  public getShoppingItems(): Observable<ShoppingCart> {
    return this.httpClient.get<ShoppingCart>(`${this.apiUrl}`);
  }

  public updateShoppingItems(items: ShoppingItem[]): Observable<ShoppingItem[]> {
    return this.httpClient.put<ShoppingItem[]>(this.apiUrl, items);
  }

  public reorderShoppingItems(items: ShoppingItem[]): Observable<ShoppingItem[]> {
    return this.httpClient.post<ShoppingItem[]>(`${this.apiUrl}/reorder`, items);
  }

  public removeShoppingItems(ids: string[]): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${ids}`);
  }

  public updateCart(payload: Partial<ShoppingCart>): Observable<ShoppingCart> {
    return this.httpClient.patch<ShoppingCart>(`${this.apiUrl}/cart`, payload);
  }
}
