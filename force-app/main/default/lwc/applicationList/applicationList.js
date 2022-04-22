import { track, api, wire, LightningElement } from 'lwc';
import { getListUi } from 'lightning/uiListApi';

const fieldsByEntity = {
    "Job_Application__c" : ["Name", "CV__c", "Approved__c"]
}

export default class ApplicationList extends LightningElement {

    @api
    apiName = "Job_Application__c";

    @api
    listViewApiName = 'All';

    @track
    records;
    
    @track
    show = false;

    @wire(getListUi, { objectApiName: '$apiName', listViewApiName: '$listViewApiName', pageSize: 100 })
    wiredListUI({ data, error }) {
        if (!data) return;
        this.records = data.records.records.map((record) => {
            console.log(record.fields[fieldsByEntity[this.apiName][2]]);
            console.log(record.fields[fieldsByEntity[this.apiName][1]]);
            return {
                id : record.fields.Id.value,
                field1 : (record.fields[fieldsByEntity[this.apiName][0]] || { value : ""}).value,
                field2 : (record.fields[fieldsByEntity[this.apiName][1]] || { value : ""}).value,
                field3 : (record.fields[fieldsByEntity[this.apiName][2]] || { value : ""}).value
            }
            
        });
        this.show = true;
//        this.fireEvent(this.records[0].id);
    }
    handleClick(event) {
        this.fireEvent(event.target.parentElement.getAttribute('data-record-id'));
    }

    fireEvent(recordId) {
        this.dispatchEvent(
            new CustomEvent('itemselected', {
                cancelable : true,
                bubbles : true,
                composed : true,
                detail : {
                    recId : recordId
                }
            })
        );
    }
}