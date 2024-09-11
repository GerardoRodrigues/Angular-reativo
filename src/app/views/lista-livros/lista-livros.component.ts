import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, switchMap, throwError } from 'rxjs';
import { Item, LivroResultado } from 'src/app/model/Interfaces';
import { LivroVolumeInfo } from 'src/app/model/LivroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy{

  campoBusca = new FormControl();
  mensagemErro: string;
  livroResultado: LivroResultado;

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(300),
    filter(valorDigitado => valorDigitado.length >= 3),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    distinctUntilChanged(),
    map(resultado => this.livroResultado = resultado),
    map((resultado) => resultado.items ?? []),
    map((items) => this.livrosResultado(items)),
    catchError(() => {
      this.mensagemErro = 'Ops, ocorreu um erro. Recarregue a página.';
      return EMPTY;
    })
  )

  livrosResultado(items: Item[]): LivroVolumeInfo[]{
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }

  ngOnDestroy(): void {
  }
}



