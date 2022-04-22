import { LightningElement,api,track ,wire} from 'lwc';
import CV_FIELD from '@salesforce/schema/Job_Application__c.CV__c';
import updaterec from '@salesforce/apex/Updaterecord.updaterec';
import { getRecord } from 'lightning/uiRecordApi';
import APPROVAL_FIELD from '@salesforce/schema/Job_Application__c.Approved__c';
import { refreshApex } from '@salesforce/apex';

const FIELDS = [APPROVAL_FIELD];
export default class ApllicationDetail extends LightningElement {
    @api
    recId;
    //console.log(recId);

@api
objectApiName="Job_Application__c";
@api
fields2=CV_FIELD;
 
@wire (getRecord,{ recordId: '$recId', fields: FIELDS })
appl;
handleClick(event)
{
updaterec({rec:this.recId})
.then(result=>{
    console.log(result);
})
.catch(error=>{
    console.log(error);
});
 refreshApex(this.appl);
}
    get show() {
        
        return this.appl.data ? true : null ;
        //return !!this.recId;
    }
    get requiresApproval() {
               //console.log(this.appl.data.fields.Approved__c.value);
              // return false;
 return this.appl.data.fields.Approved__c.value ? false : true;
    }
}