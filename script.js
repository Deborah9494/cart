 /*
ESERCIZIO
Create a web-page to manage a warehouse.

Once loaded for the first time, the page should visualize a table 
which shows the content of the warehouse, with the name of the 
items and the quantity stored, and a button that can be used to 
order other items. 
If the button is clicked, two input fields, 
with relative descriptions, and another button has to appear. 
Those input fields have to be used to insert the name of 1 item 
to be ordered and the quantity ordered. 

By clicking the second 
button the order is placed, and the table has to updated with 
the new item and the respective ordered quantity. If the item 
already exists in the table, its quantity has to be updated. 
Once the second button is clicked, the input fields, descriptions 
d the second button should be hidden. For the next order the 
input fields should be empty.

New requirements: the page should give the possibility to set 
a maximum amount of item to be stored. An input field will show 
the limit, set to 30. The user should be able to change the limit
and set it by clicking on a button.  Every time the user clicks 
on a button (all buttons) the limit is checked and, if the number 
of items in the warehouse is larger than the limit, a warning 
should appear. 
 */

$(document).ready(function () {

    let maxLimit = 30;

    function totalQuantity() {
        let total = 0;
        $("#MyTable tbody tr").each(function () {
            total += parseInt($(this).find("td:eq(1)").text());
        });
        return total;
    }

    function checkLimit() {
        if (totalQuantity() > maxLimit) {
            alert("Warehouse limit exceeded!");
        }
    }

    $("#setLimit").click(function () {
        maxLimit = parseInt($("#limit").val());
        checkLimit();
    });

    $("#addRow").click(function () {
        $("#orderForm").show();
        $("#itemName").val("");
        $("#itemQty").val("");
        checkLimit();
    });

    $("#addItem").click(function () {
        let name = $("#itemName").val().trim();
        let qty = parseInt($("#itemQty").val());

        if (name === "" || isNaN(qty) || qty <= 0) {
            alert("Please insert valid data");
            return;
        }

        let found = false;

        $("#MyTable tbody tr").each(function () {
            let itemName = $(this).find("td:eq(0)").text();
            let itemQty = parseInt($(this).find("td:eq(1)").text());

            if (itemName === name) {
                $(this).find("td:eq(1)").text(itemQty + qty);
                found = true;
            }
        });

        if (!found) {
            $("#MyTable tbody").append(
                "<tr><td>" + name + "</td><td>" + qty + "</td></tr>"
            );
        }

        $("#orderForm").hide();
        checkLimit();
    });
});

