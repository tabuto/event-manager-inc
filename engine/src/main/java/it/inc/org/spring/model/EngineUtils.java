package it.inc.org.spring.model;

import java.util.Date;
import java.util.concurrent.TimeUnit;

public class EngineUtils {

	/**
	 * Restituisce la differenza tra due date nell'unita di tempo specificata
	 * dal parametro tmOutput
	 * @param start
	 * @param end
	 * @param tmOutput
	 * @return
	 */
	public static long getDatesDiff(Date start, Date end, TimeUnit tmOutput) {
		if (start == null || end == null || tmOutput == null)
			return -1;
		return tmOutput.convert(end.getTime() - start.getTime(),
				TimeUnit.MILLISECONDS);
	}
}
