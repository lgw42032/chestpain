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
                        url:'/getCaseByTaskCode',
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
                        url:'/patientCaseInfo',
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
                        url:'/getChestPainInfo',
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
                        url:'/getIllTeller',
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
                    url: '/getHandOver',
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
                    url:'/getTaskByID',
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
                    url:'/getTaskDetailByID',
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
                    url:'/getDAge',
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
                    url:'/getDFolk',
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
                    url:'/getDInDepartment',
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
                    url:'/getDDepartment',
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
                    url:'/getDLinkman',
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
                    url:'/getDOutComes',
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
                    url:'/getDDiseaseReason',
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
                    url:'/getDILLState',
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
                    url:'/getDCureResult',
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
                    url:'/getDDiseaseClass',
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
                    url:'/getStations',
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
                    url:'/getPersonsByPersonType',
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
                    url:'/getDPmhq',
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
                    url:'/getDAllergyq',
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
                    url:'/getDPhysicalExaminationq',
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
                    url:'/getDPosition',
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
                    url:'/getDMind',
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
                    url:'/getDSkin',
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
                    url:'/getDCyanosis',
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
                    url:'/getDLightReflex',
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
                    url:'/getDAccessoryExaminationq',
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
                    url:'/getDCureMeasure',
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
                    url:'/getDMedicine',
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
                    url:'/addPatientCaseBaseInfo',
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
                    url:'/editPatientCaseBaseInfo',
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
                    url:'/editPhysicalExamination',
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
                    url:'/addAccessoryExamination',
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
                    url:'/editAccessoryExamination',
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
                    url:'/editMeasuresInfo',
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
                    url:'/addChestPainInfo',
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
                    url:'/addAllChestPainInfo',
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
                    url:'/editChestPainInfo',
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
                    url:'/addIllteller',
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
                    url:'/editIllteller',
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
                    url:'/addHandoverRecord',
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
                    url:'/editHandoverRecord',
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
                    url:'/deletePatientCase',
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
