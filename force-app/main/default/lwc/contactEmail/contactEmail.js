import { LightningElement,api,track ,wire} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import sendMail from '@salesforce/apex/Updaterecord.sendMail';
import { getRecord,getFieldValue } from 'lightning/uiRecordApi';
import APPROVAL_FIELD from '@salesforce/schema/Job_Application__c.Approved__c';
import CONTACT_FIELD from '@salesforce/schema/Job_Application__c.Contact__r.Id';
import { refreshApex } from '@salesforce/apex';

const FIELDS = [APPROVAL_FIELD,CONTACT_FIELD];

export default class ContactEmail extends LightningElement {
    @api
    recId;
    //console.log(recId);
    @track
    contactrec;

@api
objectApiName="Contact";
@api
fields2=EMAIL_FIELD;
 
@wire (getRecord,{ recordId: '$recId', fields: FIELDS })
appl;
handleClick(event)
{
sendMail({applid:this.recId, subject : "Job Application Approved"})
.then(()=>{
    console.log("Mail Sent");
                const event = new ShowToastEvent({
                    message:  "Mail Sent Successfully!",
                    variant: "Success"
                });
                this.dispatchEvent(event);
})
.catch(error=>{
    console.log(error);
});
 refreshApex(this.appl);
}
    get show() {
        this.contactrec=getFieldValue(this.appl.data,CONTACT_FIELD);
        return this.appl.data ? true : null ;
        //return !!this.recId;
    }
    get sendMail() {
               //console.log(this.appl.data.fields.Approved__c.value);
              // return false;
 return this.appl.data.fields.Approved__c.value ;
    }
}