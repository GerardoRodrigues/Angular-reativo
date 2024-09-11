import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, switchMap } from 'rxjs';
import { Item } from 'src/app/model/Interfaces';
import { LivroVolumeInfo } from 'src/app/model/LivroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy{

  campoBusca = new FormControl();

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    map((items) => this.livrosResultado(items))
  )

  livrosResultado(items: Item[]): LivroVolumeInfo[]{
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }

  ngOnDestroy(): void {
  }
}



