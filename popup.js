const clockinInput = document.getElementById('clock-in');
const clockoutInput = document.getElementById('clock-out');

const setButton = document.getElementById('set');
const applyButton = document.getElementById('apply');

document.addEventListener('DOMContentLoaded', function () {
    browser.storage.local.get(['clockin', 'clockout'], function (result) {
        if(result.clockin !== undefined) {
            clockinInput.value = result.clockin;
        }
        if(result.clockout !== undefined) {
            clockoutInput.value = result.clockout;
        }
    });
});

setButton.addEventListener('click', function () {
    browser.storage.local.set({
        clockin: clockinInput.value,
        clockout: clockoutInput.value
    }, function () {
        console.log('Value is set to ' + clockinInput.value + ' and ' + clockoutInput.value);
    });
});

applyButton.addEventListener('click', function () {
    browser.tabs.query({active: true, currentWindow: true}, function (tabs) {
        const activeTab = tabs[0];

        browser.tabs.executeScript(activeTab.id, {
            code:`
            document.getElementById('editClockIn').value = '${clockinInput.value}';
            document.getElementById('editClockOut').value = '${clockoutInput.value}';
            `
        });
    });
});