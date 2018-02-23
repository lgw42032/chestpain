/**
 * Created by dell on 2018/1/4.
 */
define(function(require, exports, module) {
    var func = require('./func');
    var cxwUtil = require('./cxwUtil');
    module.exports = {
        getConfig: function(){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'/getConfig',
                    type:'get',
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getConfig',err)
                        reject(err)
                    }
                })
            })
        },
        getCaseByTaskCode:function(url,data){
            return new Promise(function(resolve,reject){
                    $.ajax({
                        url:'http://' + url +'/api/case/getCaseByTaskCode',
                        type:'get',
                        data: data,
                        success:function(data){
                            resolve(data);
                        },
                        error:function(err){
                            console.log('getCaseByTaskCode',err)
                            reject(err)
                        }
                    })
                })
        },
        getPatientCase:function(url,data){
            console.log(data);
            return new Promise(function(resolve,reject){
                    $.ajax({
                        url:'http://' + url +'/api/case/patientCaseInfo',
                        type:'post',
                        data: data,
                        success:function(data){
                            resolve(data);
                        },
                        error:function(err){
                            console.log('getPatientCase',err)
                            reject(err)
                        }
                    })
                })
        },
        getChestpainCase:function(url,data){
            console.log(data);
            return new Promise(function(resolve,reject){
                    $.ajax({
                        url:'http://' + url +'/api/case/getChestPainInfo',
                        type:'get',
                        data: data,
                        success:function(data){
                            resolve(data);
                        },
                        error:function(err){
                            console.log('getChestpainCase',err)
                            reject(err)
                        }
                    })
                })
        },
        getIllTeller:function(url,data){
            return new Promise(function(resolve,reject){
                    $.ajax({
                        url:'http://' + url +'/api/case/getIllTeller',
                        type:'get',
                        data: data,
                        success:function(data){
                            resolve(data);
                        },
                        error:function(err){
                            console.log('getIllTeller',err)
                            reject(err)
                        }
                    })
                })
        },
        getHandOver:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://' + url +'/api/case/getHandOver',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getHandOver',err)
                        reject(err)
                    }
                })
            })
        },
        getTaskByID:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getTaskByID',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getTaskByID',err)
                        reject(err)
                    }
                })
            })
        },
        getTaskDetailByID:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getTaskDetailByID',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getTaskByID',err)
                        reject(err)
                    }
                })
            })
        },
        getDAge:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDAge',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDAge',err)
                        reject(err)
                    }
                })
            })
        },
        getDFolk:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDFolk',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDFolk',err)
                        reject(err)
                    }
                })
            })
        },
        getDInDepartment:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDInDepartment',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDInDepartment',err)
                        reject(err)
                    }
                })
            })
        },
        getDDepartment:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDDepartment',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDDepartment',err)
                        reject(err)
                    }
                })
            })
        },
        getDLinkman:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDLinkman',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDLinkman',err)
                        reject(err)
                    }
                })
            })
        },
        getDOutComes:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDOutComes',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDOutComes',err)
                        reject(err)
                    }
                })
            })
        },
        getDDiseaseReason:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDDiseaseReason',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDDiseaseReason',err)
                        reject(err)
                    }
                })
            })
        },
        getDILLState:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDILLState',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDILLState',err)
                        reject(err)
                    }
                })
            })
        },
        getDCureResult:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDCureResult',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDCureResult',err)
                        reject(err)
                    }
                })
            })
        },
        getDDiseaseClass:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDDiseaseClass',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDDiseaseClass',err)
                        reject(err)
                    }
                })
            })
        },
        getStations:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getStations',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getStations',err)
                        reject(err)
                    }
                })
            })
        },
        getPersonsByPersonType:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getPersonsByPersonType',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getPersonsByPersonType',err)
                        reject(err)
                    }
                })
            })
        },
        getDPmhq:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDPmhq',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDPmhq',err)
                        reject(err)
                    }
                })
            })
        },
        getDAllergyq:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDAllergyq',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDAllergyq',err)
                        reject(err)
                    }
                })
            })
        },
        getDPhysicalExaminationq:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDPhysicalExaminationq',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDAllergyq',err)
                        reject(err)
                    }
                })
            })
        },
        getDPosition:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDPosition',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDPositionErr',err)
                        reject(err)
                    }
                })
            })
        },
        getDMind:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDMind',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDMindErr',err)
                        reject(err)
                    }
                })
            })
        },
        getDSkin:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDSkin',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDMindErr',err)
                        reject(err)
                    }
                })
            })
        },
        getDCyanosis:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDCyanosis',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDMindErr',err)
                        reject(err)
                    }
                })
            })
        },
        getDLightReflex:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDLightReflex',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDMindErr',err)
                        reject(err)
                    }
                })
            })
        },
        getDAccessoryExaminationq:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDAccessoryExaminationq',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDAccessoryExaminationqErr',err)
                        reject(err)
                    }
                })
            })
        },
        getDCureMeasure:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDCureMeasure',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDCureMeasureErr',err)
                        reject(err)
                    }
                })
            })
        },
        getDMedicine:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDMedicine',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDCureMeasureErr',err)
                        reject(err)
                    }
                })
            })
        },
        getDJust:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/getDJust',
                    type:'get',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getDJustErr',err)
                        reject(err)
                    }
                })
            })
        },
        addPatientCaseBaseInfo:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/addPatientCaseBaseInfo',
                    type:'post',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('addPatientCaseBaseInfoErr',err)
                        reject(err)
                    }
                })
            })
        },
        editPatientCaseBaseInfo:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/editPatientCaseBaseInfo',
                    type:'post',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('editPatientCaseBaseInfoErr',err)
                        reject(err)
                    }
                })
            })
        },
        addPhysicalExamination:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/addPhysicalExamination',
                    type:'post',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('addPhysicalExaminationErr',err)
                        reject(err)
                    }
                })
            })
        },
        editPhysicalExamination:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/editPhysicalExamination',
                    type:'post',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('editPhysicalExaminationErr',err)
                        reject(err)
                    }
                })
            })
        },
        addAccessoryExamination:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/addAccessoryExamination',
                    type:'post',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('addAccessoryExaminationErr',err)
                        reject(err)
                    }
                })
            })
        },
        editAccessoryExamination:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/editAccessoryExamination',
                    type:'post',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('editAccessoryExaminationErr',err)
                        reject(err)
                    }
                })
            })
        },
        addMeasuresInfo:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/addMeasuresInfo',
                    type:'post',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('addMeasuresInfoErr',err)
                        reject(err)
                    }
                })
            })
        },
        editMeasuresInfo:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/editMeasuresInfo',
                    type:'post',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('editMeasuresInfoErr',err)
                        reject(err)
                    }
                })
            })
        },

        addChestpainTime:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/addChestPainInfo',
                    type:'post',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getChestpainTimeErr',err)
                        reject(err)
                    }
                })
            })
        },
        addChestpainCase:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/addAllChestPainInfo',
                    type:'post',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('getChestpainTimeErr',err)
                        reject(err)
                    }
                })
            })
        },


        editChestpainCase:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/editChestPainInfo',
                    type:'post',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('editChestpainCaseErr',err)
                        reject(err)
                    }
                })
            })
        },

        addIllteller:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/addIllteller',
                    type:'post',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('addIlltellerErr',err)
                        reject(err)
                    }
                })
            })
        },
        editIllteller:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/editIllteller',
                    type:'post',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('editIlltellerErr',err)
                        reject(err)
                    }
                })
            })
        },
        addHandoverRecord:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/addHandoverRecord',
                    type:'post',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('addHandoverRecordErr',err)
                        reject(err)
                    }
                })
            })
        },
        editHandoverRecord:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/editHandoverRecord',
                    type:'post',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('editHandoverRecordErr',err)
                        reject(err)
                    }
                })
            })
        },
        deletePatientCase:function(url,data){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/deletePatientCase',
                    type:'post',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('destroyCaseErr',err)
                        reject(err)
                    }
                })
            })
        },
        saveAlterRecord:function(url,data){

            return new Promise(function(resolve,reject){
                $.ajax({
                    url:'http://'+ url +'/api/case/saveAlterRecord',
                    type:'post',
                    data: data,
                    success:function(data){
                        resolve(data);
                    },
                    error:function(err){
                        console.log('destroyCaseErr',err)
                        reject(err)
                    }
                })
            })
        },

    }


});
