import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item, Livro } from 'src/app/model/Interfaces';
import { LivroVolumeInfo } from 'src/app/model/LivroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy{

  listaLivro: Livro[];
  campoBusca = '';
  subscription: Subscription;

  constructor(private service: LivroService) { }

  buscar(){
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: item => this.listaLivro = this.livrosResultado(item),
      error: erro => console.error(erro),
    });
  }

  livrosResultado(items: Item[]): LivroVolumeInfo[]{
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}



