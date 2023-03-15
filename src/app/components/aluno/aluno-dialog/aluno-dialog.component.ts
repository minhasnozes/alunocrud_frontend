import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlunoService } from '../../../services/aluno.service';
import { Aluno } from '../../../interfaces/aluno';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';


export const MY_FORMATS = {
   parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-aluno-dialog',
  templateUrl: './aluno-dialog.component.html',
  styleUrls: ['./aluno-dialog.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class AlunoDialogComponent {
  formulario: FormGroup;
  id : FormControl;
  nome: FormControl;
  sobrenome: FormControl;
  data_nascimento: FormControl;
  durationInSeconds = 5;
  // datepickerControl = new MatDatepickerControl<any>(this.myControl);
  numero = 1;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { aluno: Aluno, id: string, parent: any },
    private alunoService: AlunoService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AlunoDialogComponent>
  ) {

    this.nome = new FormControl(data.aluno?.nome || '', [Validators.required]);
    this.nome = new FormControl(data.aluno?.nome || '', [Validators.required]);
    this.sobrenome = new FormControl(data.aluno?.sobrenome || '', [Validators.required]);
    this.data_nascimento = new FormControl(data.aluno?.data_nascimento || '', [Validators.required]);

    if (data.aluno) {
      this.id = new FormControl(data.aluno.id)
      this.formulario = new FormGroup({
        id: this.id,
        nome: this.nome,
        sobrenome: this.sobrenome,
        data_nascimento: this.data_nascimento
      });
    } else {
      this.formulario = new FormGroup({
        nome: this.nome,
        sobrenome: this.sobrenome,
        data_nascimento: this.data_nascimento
      });
    }
  }
  add() {
    const campo_data = new Date(this.formulario.value.data_nascimento);
    const ano = campo_data.getFullYear();
    const mes = ('0' + (campo_data.getMonth() + 1)).slice(-2);
    const dia = ('0' + campo_data.getDate()).slice(-2);
    const dataFormatada = `${ano}-${mes}-${dia}`;
    this.formulario.value.data_nascimento = dataFormatada;
    if (this.data.aluno) {
      this.alunoService.updateAluno(this.formulario.value).subscribe(r => {
        this._snackBar.open('Aluno Editado');
        this.dialogRef.close(true);
        this.dialogRef.afterClosed().subscribe(result => {
          this.data.parent.parentComponentMethod(result); // chama o método do componente pai com o resultado
        });
      });
    } else {
      this.alunoService.createAluno(this.formulario.value).subscribe(r => {
        this._snackBar.open('Aluno cadastrado');
        this.dialogRef.close(true);
        this.dialogRef.afterClosed().subscribe(result => {
          this.data.parent.parentComponentMethod(result); // chama o método do componente pai com o resultado
        });
      });
    }
  }

  closeModal() {
    this.dialogRef.close(true);
  }

}

