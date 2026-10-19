const alertService =
    require("../services/alertService");


const getAlerts = async (req, res) => {
    try {
        const { status, minScore, maxScore } = req.query;

        // minScore and maxScore must either both be present or both absent - fix2
        if ((minScore !== undefined && maxScore === undefined) ||
            (minScore === undefined && maxScore !== undefined)
        ) {
            return res.status(400).json({
                error: "Both score limits are required"
            });
        }

        // Status may only be open or resolved - fix1
        if (status && !["open", "resolved"].includes(status)) {
            return res.status(400).json({
                error: "Invalid status"
            });
        }

        //await fix
        const alerts = await alertService.findAlerts({ status, minScore, maxScore });

        return res.status(200).json(alerts);

    } catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};



const resolveAlert = async (req, res) => {
    try {
        const alert =
            await alertService.resolveAlert(
                req.params.id
            );
        
        //missed fix
        return res.status(200).json(alert);

    } catch (error) {
        // Alert doesn't exist - fix3
         if (error.message === "ALERT_DO_NOT_EXIST") {
            return res.status(404).json({
                error: "Alert not found"
            });
        }

        // Alert doesn't exist - fix4
         if (error.message === "ALREADY_RESOLVED") {
            return res.status(409).json({
                error: "Alert already resolved"
            });
        }

        return res.status(500).json({
            error: "Internal server error"
        });

    }
};


module.exports = {
    getAlerts,
    resolveAlert
};