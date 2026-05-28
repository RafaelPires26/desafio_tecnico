import { Component, computed, signal, effect, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class HomeComponent {

  public items = signal<CartItem[]>([
    { id: 1, name: 'Camiseta Tech', quantity: 1, price: 89.90 },
    { id: 2, name: 'Mouse Gamer', quantity: 1, price: 149.00 }
  ]);

  public total = computed(() => {
    return this.items().reduce((acc, item) => acc + (item.quantity * item.price), 0);
  });

  public totalChanged = output<number>();

  constructor() {
    effect(() => { this.totalChanged.emit(this.total()); });
  }
  
  public addItem(itemToIncrement: CartItem): void {
    this.items.update(currentItems => 
      currentItems.map(item => 
        item.id === itemToIncrement.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  public removeItem(id: number): void {
    this.items.update(currentItems => {
      return currentItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  }
}
