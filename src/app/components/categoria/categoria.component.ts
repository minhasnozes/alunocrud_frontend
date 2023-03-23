import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { Categoria } from 'src/app/interfaces/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CategoriaDialogComponent } from '../categoria/categoria-dialog/categoria-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
// export class CategoriaComponent {

// }

export class CategoriaComponent implements OnInit {
  categoria: Categoria[];
  primary: ThemePalette = 'warn';
  displayedColumns: string[] = ['checkbox', 'nome', 'actionsColumn'];
  dataSource = new MatTableDataSource<Categoria>();
  selection = new SelectionModel<Categoria>(true, [])
  // @ViewChild(MatSort) sort: MatSort;
  constructor(
    private categoriaService: CategoriaService,
    private dialog: MatDialog
  ) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    // this.sort.sort(({ id: 'id', start: 'asc'}) as MatSortable);
    this.dataSource.paginator = this.paginator;
    this.getCategoria();

  }

  getCategoria(): void {
    this.categoriaService.getAllCategoria().subscribe(response => {
      this.dataSource.data = response.results;
    })
  }

  parentComponentMethod(result: boolean) {
    this.getCategoria();
  }

  addNovoCurso() {
    this.dialog.open(CategoriaDialogComponent, {
      data: {
        parent: this
      },
      height: '300px',
      width: '550px',
    });
  }

  edit(categoria: Categoria) {
    this.dialog.open(CategoriaDialogComponent, {
      data: {
        categoria: categoria,
        parent: this
      },
      height: '450px',
      width: '550px',
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Tem certeza que deseja deletar este categoria?', title: 'Categoria' },
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoriaService.deleteCategoria(id).subscribe(r => {
          this.getCategoria();
        });
      }
    });
  }

  async batchDelete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Tem certeza que deseja deletar todos estes categoria?' }
    });
    try {
      const result = await firstValueFrom(dialogRef.afterClosed());

      if (result) {
        for (const elemento of this.selection.selected) {
          const id: any = elemento.id;
          await firstValueFrom(this.categoriaService.deleteCategoria(id));
        }
        this.getCategoria();
      }
    } catch (error) {
      console.error(error);
    }

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
