#include "pxt.h";
using namespace pxt;

/**
 * This is the Kitronik_Move_Motor Package
 */
//% color=#00A654 weight=100
namespace Kitronik_Move_Motor {

    int value;
    //%
    int hardwareVersion() {

        #if MICROBIT_CODAL
            value = 2;
        #else
            value = 1;
        #endif
        return value;
    }
}