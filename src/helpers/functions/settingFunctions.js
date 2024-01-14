function getAllSettings(pages) {
    //Get a object of all settings' default values

    let allSettings = {};
    Object.keys(pages).forEach((pageId) => {
        //Loop through all the pages of settings
        let page = pages[pageId];
        page.sections.forEach((section) => {
            if (section.type !== "section") return;

            //Loop through all the sections of the page
            Object.keys(section.settings).forEach((settingKey) => {
                allSettings[settingKey] = section.settings[settingKey];
            });

        });
    });
    return allSettings
}
function getSettingDefaultInfo(pages, setting) {
    //Return the default values, type, etc for a setting from a setting list.

    return getAllSettings(pages)[setting]

    // let info;
    // Object.keys(pages).forEach((pageId) => {
    //     //Loop through all the pages of settings
    //     let page = pages[pageId];
    //     page.sections.forEach((section) => {
    //         //Loop through all the sections of the page
    //         if (section.settings[setting]) {
    //             //Found the setting that is requested
    //             info = section.settings[setting];
    //         }
    //     });
    // });
    // return info
}

function settingCleanRenderList(pages, settings) {
    let cleanPages = {};
    Object.keys(pages).forEach((page) => {
        //Loop through all pages of settings  

        cleanPages[page] = {
            humanName: pages[page].humanName,
            icon: pages[page].icon,
            sections: []
        };
        pages[page].sections.forEach((section) => {
            //Loop through all sections of the page



            //If it has a condition, make sure it is all true
            if (section.condition) {
                for (var conditionKey of Object.keys(section.condition)) {
                    if (section.condition[conditionKey] !== settings[conditionKey]) return
                }
            }

            let cleanSection = {
                humanName: section.humanName,
                type: section.type,
                settings: []
            }
            if (section.settings) {
                Object.keys(section.settings).forEach((settingKey) => {
                    if (section.settings[settingKey].condition) {
                        for (var conditionKey of Object.keys(section.settings[settingKey].condition)) {
                            if (section.settings[settingKey].condition[conditionKey] !== settings[conditionKey]) return
                        }
                    }


                    cleanSection.settings.push({
                        setting: settingKey,
                        value: settings[settingKey],
                        // valueType: section.settings[settingKey].type,
                        // humanName: section.settings[settingKey].humanName,
                        // values: section.settings[settingKey].values,
                        // placeholder: section.settings[settingKey].placeholder,
                        // itemValidationFunction: section.settings[settingKey].itemValidationFunction,
                        // itemTitleFunction: section.settings[settingKey].itemTitleFunction,
                        ...section.settings[settingKey]
                    });
                });
            }
            cleanPages[page].sections.push(cleanSection);
        })
    });
    return cleanPages;
}

export { getAllSettings, getSettingDefaultInfo, settingCleanRenderList }