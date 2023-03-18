import { OnInit, Component, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Aluno } from '../../interfaces/aluno';
import { AlunoService } from '../../services/aluno.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlunoDialogComponent } from './aluno-dialog/aluno-dialog.component';
import { MatSort, MatSortable } from '@angular/material/sort';

const ELEMENT_DATA: Aluno[] = [
  { nome: 'Marcus', sobrenome: 'Soares', data_nascimento: '04/11/1993' }
];

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {
  alunos: Aluno[];
  displayedColumns: string[] = ['nome', 'sobrenome', 'data_nascimento', 'actionsColumn'];
  dataSource = new MatTableDataSource<Aluno>();
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

  delete(id: number) {
    this.alunoService.deleteAluno(id).subscribe(r => {
    })
  }
}
