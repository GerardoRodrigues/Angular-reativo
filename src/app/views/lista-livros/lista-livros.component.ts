import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Livro } from 'src/app/model/Interfaces';
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
  livro: Livro;

  constructor(private service: LivroService) { }

  buscar(){
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: item => this.listaLivro = this.livrosResultado(item),
      error: erro => console.error(erro),
    });
  }

  livrosResultado(items){
    const livros: Livro[] = [];
    items.forEach(items => {
      livros.push(this.livro = {
        title: items.volumeInfo?.title,
        authors: items.volumeInfo?.authors,
        publisher: items.volumeInfo?.publisher,
        publishedDate: items.volumeInfo?.publishedDate,
        description: items.volumeInfo?.description,
        thumbnail: items.volumeInfo?.imageLinks?.thumbnail,
        previewLink: items.volumeInfo?.previewLink
      })
    })
    return livros;
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}



