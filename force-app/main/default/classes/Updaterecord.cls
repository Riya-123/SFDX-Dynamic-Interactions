public class Updaterecord {
    @AuraEnabled
   public static Job_application__c updaterec(Id rec){
Job_application__c j=[Select id,Approved__c from Job_application__c where id = :rec];
j.Approved__c=true;
update j;
return j;
   }
   @AuraEnabled(cacheable=true)
   public static void sendMail(Id applid,String subject){
     try{
        Job_application__c d=[Select contact__r.email,contact__r.name from Job_application__c where id= :applid ];
        string s=d.contact__r.email;
        string n=d.contact__r.name;
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            String[] toAddresses = new String[] {s};
            mail.setToAddresses(toAddresses);
            mail.setSubject(subject);
         String body='<p style="font-family:Calibri;font-size:10px">'+'Hi '+string.escapesinglequotes(n)+'!'+'<br>';
         body+='Congraturations!'+'<br>';
         body+='Your Job Application has been approved.'+'</p>';
            mail.setHtmlBody('<h1>'+ body + '</h1>');
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        }catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
   }
}
