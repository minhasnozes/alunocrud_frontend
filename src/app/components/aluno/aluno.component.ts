import { OnInit, Component, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Aluno } from '../../interfaces/aluno';
import { AlunoService } from '../../services/aluno.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlunoDialogComponent } from './aluno-dialog/aluno-dialog.component';

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
  constructor(
    private alunoService: AlunoService,
    private dialog: MatDialog
  ) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
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
    });
  }

  delete(id: number) {
    this.alunoService.deleteAluno(id).subscribe(r => {
      console.log(r);
    })
  }
}
