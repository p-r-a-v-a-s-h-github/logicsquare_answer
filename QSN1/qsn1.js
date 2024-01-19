
const students = [
    { name: "Dhishan Debnath", Roll: 1 },
    { name: "Animesh Gupta", Roll: 2 },
    { name: "Tapas Sen", Roll: 3 },
    { name: "Misti Dutta", Roll: 4 },
    { name: "Chini Misra", Roll: 5 }
   ];
   
 const Details = [
    { Roll: 5, subjects: { math: 35, english: 56, chemistry: 76, computer: 68 } },
    { Roll: 3, subjects: { math: 33, chemistry: 12, computer: 50, english: 35 } },
    { Roll: 1, subjects: { math: 55, english: 75, chemistry: 76, computer: 94 } },
    { Roll: 4, subjects: { english: 12, chemistry: 85, computer: 68, math: 45 } },
    { Roll: 2, subjects: { math: 55, english: 56, computer: 48, chemistry: 12 } }
   ];
   
   const studentsMark=[]
const  generateStudentMarkSheets=()=>{
   for(let i=0;i<students.length;i++)
   {
    for(let j=0;j<Details.length;j++)
    {
        if(students[i].Roll == Details[j].Roll){
            let Total=Details[j].subjects.math+Details[j].subjects.english+Details[j].subjects.computer+Details[j].subjects.chemistry
            studentsMark.push({
                name:students[i].name,
                Roll:students[i].Roll,
                ...Details[j].subjects,
                total:Total,
                status:Total>=200?"pass":"fail"
            })
            break;
        }
    }
    
   }
   return studentsMark;
}
const studentsMarkSheets=generateStudentMarkSheets()
console.log(studentsMarkSheets)

