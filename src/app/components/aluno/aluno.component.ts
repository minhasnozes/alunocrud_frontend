import { OnInit, Component, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Aluno } from '../../interfaces/aluno';
import { AlunoService } from '../../services/aluno.service';
import { MatDialog } from '@angular/material/dialog';
import { AlunoDialogComponent } from './aluno-dialog/aluno-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { firstValueFrom } from 'rxjs';

import { ThemePalette } from '@angular/material/core';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {
  alunos: Aluno[];
  primary: ThemePalette = 'warn';
  displayedColumns: string[] = ['checkbox', 'nome', 'sobrenome', 'data_nascimento', 'actionsColumn'];
  dataSource = new MatTableDataSource<Aluno>();
  selection = new SelectionModel<Aluno>(true, [])
  // @ViewChild(MatSort) sort: MatSort;
  constructor(
    private alunoService: AlunoService,
    private dialog: MatDialog
  ) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    // this.sort.sort(({ id: 'id', start: 'asc'}) as MatSortable);
    this.dataSource.paginator = this.paginator;
    this.getAlunos();

  }

  getAlunos(): void {
    this.alunoService.getAllAlunos().subscribe(response => {
      this.dataSource.data = response.results;
    })
  }

  parentComponentMethod(result: boolean) {
    this.getAlunos();
  }

  addNovoAluno() {
    this.dialog.open(AlunoDialogComponent, {
      data: {
        parent: this
      },
      height: '450px',
      width: '550px',
    });
  }

  edit(aluno: Aluno) {
    this.dialog.open(AlunoDialogComponent, {
      data: {
        aluno: aluno,
        parent: this
      },
      height: '450px',
      width: '550px',
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Tem certeza que deseja deletar este aluno?' },
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alunoService.deleteAluno(id).subscribe(r => {
          this.getAlunos();
        });
      }
    });
  }

  async batchDelete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Tem certeza que deseja deletar todos estes aluno?' }
    });
    try {
      const result = await firstValueFrom(dialogRef.afterClosed());

      if (result) {
        for (const elemento of this.selection.selected) {
          const id: any = elemento.id;
          await firstValueFrom(this.alunoService.deleteAluno(id));
        }
        this.getAlunos();
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
